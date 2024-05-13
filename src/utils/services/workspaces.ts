import api from "@/utils/http";
import {errors, routes} from "@/constants/index";
import axios from "axios";


const getByID = async (id: string): Promise<IWorkspace | null> => {
    try {
        const response = await api.get(routes.Core.Workspace.ByID(id));
        if (response?.status === 200) {
            return response.data
        }
        return null
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const status = e.response?.status
            if (status === axios.HttpStatusCode.BadRequest) {
                throw errors.BadRequest.RU
            } else if (status === axios.HttpStatusCode.Unauthorized) {
                throw errors.Session.Unauthorized.RU
            } else if (status === axios.HttpStatusCode.NotFound) {
                throw errors.Workspace.NotFound.RU
            }
        }
        return null
    }
}

export const workspaceServices = {
    getByID,
}