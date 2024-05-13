// Error texts

export const errors = {
    User: {
        AlreadyExist: {
            Message: "user already exist",
            RU: "Пользователь с таким email уже существует",
        },
        NotFound: {
            Message: "user not found",
            RU: "Пользователь с таким email не найден",
        },
        IncorrectPassword: {
            Message: "incorrect password",
            RU: "Вы ввели неверный пароль"
        },
        MustAuthWGoogle: {
            Message: "user must proceed with google",
            RU: "Ваш привязан к авторизаций через Google"
        }
    },
    BadRequest: {
        InvalidPassword: {
            Message: "invalid phone number",
            RU: "Неправильный формат пароля"
        },
        Message: "bad request",
        RU: "Неверный формат запроса"
    },
    Session: {
        Unauthorized: {
            Message: "unauthorized",
            RU: "Вы не авторизованы",
        },
        Expired: {
            Message: "session is expired",
            RU: "Ваша текущая сессий истекла"
        },
    },
    Workspace: {
        NotFound: {
            Message: "workspace not found",
            RU: "Рабочее пространство не найдено",
        },
    },
    InternalServerError: {
        message: "internal server error",
        RU: "Произошла неопознанная ошибка",
    },

};

export const TokenExpiresAt = (): Date => {
    return new Date(new Date().getTime() + 30 * 50 * 1000)
}

export const ERROR_UNAUTHORIZED = "unauthorized";
export const ERROR_U_EXISTED = "already exists";
export const ERROR_NOT_FOUND = "not found";
export const ERROR_BAD_REQUEST = "bad request";

// API route
export const API_RESET_PASSWORD = "/user/reset-password";

// Route

export const routes = {
    Auth: {
        SignIn: "/auth/sign-in",
        SignUp: "/auth/sign-up",
        Refresh: "/auth/refresh",
        Logout: "/auth/logout",
        Verify: "/auth/verify",
        Google: {
            Redirect: (state: string): string => {
                return `/auth/google/${state}/redirect`;
            },
            CallBack: "/auth/google/call-back",
        },
        User: {
            SendVerifyCode: "/auth/user/send-verify-code"
        }
    },
    Core: {
        Workspace: {
            Create: "http://localhost/core/workspace",
            ByID: (id: string): string => {
                return `/core/workspace/${id}`
            },
            ByUser: "/core/workspace/by-user",
        }
    }
};

const clientRoutes = {
    Workspaces: "/workspaces",
    WorkspaceByID: "/workspace/[uuid]",
    Auth: {
        Login: "/auth/login",
        LoginWGoogle: "/auth/login/google",
        Logout: "/auth/logout",
        Register: "/auth/register"
    }
}

export const protectedRoutes = [
    clientRoutes.Workspaces,
    clientRoutes.WorkspaceByID
];

export const refreshRoutes = [
    routes.Auth.Logout,
]


export const ROUTE_MAIN = "/";
export const ROUTE_LOGIN = "/auth/login";
export const ROUTE_REGISTER = "/auth/register";
export const ROUTE_LOGOUT = "/auth/logout";
export const ROUTE_REFRESH_TOKEN = "/auth/refresh";
export const ROUTE_RESET_PASSWORD = "/auth/reset-password";
export const ROUTE_USER_PROFILE = "/user/profile";
export const ROUTE_VERIFY_USER = "/user/verify";
