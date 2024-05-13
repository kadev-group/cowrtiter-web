import {NextRequest} from 'next/server'


export function middleware(request: NextRequest) {
    // const token = request.cookies.get('token')
    //
    // const isProtectedRoute = PROTECTED_ROUTES.includes(request.nextUrl.pathname)
    //
    // if ( &&
    //     (token?.value === "" && token === undefined)) {
    //     request.cookies.delete('token')
    //
    //     const response = NextResponse.redirect(new URL('/auth/login', request.url))
    //     return response
    // }
    //
    // if (AUTH_ROUTES.includes(request.nextUrl.pathname) &&
    //     (token?.value !== "" && token !== undefined)) {
    //     return NextResponse.redirect(new URL('/workspaces', request.url))
    // }
}
