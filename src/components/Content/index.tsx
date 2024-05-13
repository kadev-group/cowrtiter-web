import {ReactNode} from 'react'

type IProps = {
    children: string | ReactNode | JSX.Element | JSX.Element[]
    className: string
}

const Content = (props: IProps) => {
    return <div className={props.className}>{props.children}</div>
}

export default Content
