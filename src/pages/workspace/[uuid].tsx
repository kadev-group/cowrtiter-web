import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import React, {useState, useEffect, useContext} from "react";
import {useRouter} from "next/router";
import Editor from '@monaco-editor/react';
import {editor} from "monaco-editor";
import styles from "./index.module.scss"
import {Button, Select, Switch} from "evergreen-ui";
import {AuthContext} from "@/providers/auth_provider";
import {UserSession} from "@/utils/models/user";
import {WSMessage} from "@/utils/models/websocket";
import workspaces from "@/pages/workspaces";
import {workspaceServices} from "@/utils/services/workspaces";

type IOptions = {
    size: number
    lang: string;
    defaultText: string
    autocomplete: boolean
}

const languages = [
    {
        lang: "go",
        defaultText: "package main\n\nfunc main() {\n\n}\n"
    },
    {
        lang: "javascript",
        defaultText: `console.log("hello world")`,
    },
    {
        lang: "python",
        defaultText: `print("Hello world")`
    },
]

const Workspace = (): JSX.Element => {
    const router = useRouter();
    const ctx = useContext(AuthContext);
    const userID = ctx?.user?.user_id

    const [workspaceID, setWorkspaceID] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [body, setBody] = useState("")
    const [error, setError] = useState<string | null>(null)

    const [option, setEditorOption] = useState<IOptions>({
        size: 14,
        autocomplete: true,
        lang: languages[0].lang,
        defaultText: languages[0].defaultText,
    });

    useEffect(() => {
        let wID = ""
        if (router.query.uuid) {
            wID = router.query.uuid.toString();
        }

        if (wID === "" || error !== null) return;

        workspaceServices.getByID(wID).then((data) => {
            if (data !== null) {
                setBody(data?.body)
            }
        }).catch((e) => {
            setError(e)
        })


        const socket = new WebSocket(`ws://localhost:4000/v1/core/ws/pool/${userID}/${wID}`);

        socket.onopen = (e) => {
            console.log("WS connected")
        }

        socket.onmessage = (event) => {
            console.log(event.data);
            const data: WSMessage = JSON.parse(event.data);
            if (data.error_message !== "" && data.error_message !== undefined) {
                setError(data.error_message)
                return;
            }
            setBody(data.body);
        };

        socket.onerror = (e) => {
            console.error('WebSocket error:', e);
        };

        setWorkspaceID(wID)
        setSocket(socket)
    }, [router, error]);


    const handleTextInputChange = (value: string | undefined, event: editor.IModelContentChangedEvent): void => {
        if (value === undefined) return;

        setBody(value)
        if (socket === null ||
            userID === undefined ||
            workspaceID === "") {
            return
        }

        const message: WSMessage = {
            user_id: userID,
            workspace_id: workspaceID,
            body: value,
            error_message: ""
        };

        socket.send(JSON.stringify(message));
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        option.autocomplete = e.target.checked
        setEditorOption(option)
    }

    const handleSize = (change: number) => {
        option.size += change
        setEditorOption(option)
    }

    return (
        <div className="flex h-screen w-screen">
            <Sidebar/>
            <Content className='h-full w-full'>
                <div>
                    <div className={styles.settings}>
                        <p className="text-base leading-7 text-gray-600 mx-2">Autocomplete</p>
                        <Switch
                            className="mr-4"
                            checked={option.autocomplete} onChange={handleCheck}/>
                        <div className="flex items-center h-8">
                            <Select className="mx-4" width={120}>
                                {languages.map((o, key) => <option key={key}>{o.lang}</option>)}
                            </Select>
                            <p className={styles.text}>{option.size}</p>
                            <Button className="mr-2"
                                    height={24} width={16}
                                    onClick={() => handleSize(1)}>+</Button>
                            <Button className="mr-2"
                                    height={24} width={16}
                                    onClick={() => handleSize(-1)}>-</Button>
                        </div>
                    </div>

                    <Editor
                        height="90vh"
                        width="100%"
                        defaultLanguage={option.lang}
                        defaultValue={option.defaultText}
                        onChange={handleTextInputChange}
                    />
                </div>
            </Content>
        </div>
    );
};

export default Workspace;
