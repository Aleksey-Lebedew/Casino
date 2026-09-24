export const PATHS = {
    main: () => '/',
    postById: (id: string) => `/page/posts/${id}`,
    counter: () => '/counter',
    searchPage: () => '/search',

    // auth
    signIn: () => '/signIn',
    confirmed: () => '/confirmed',
    // groups
    groups: () => '/groups',
    users: () => '/users',

    //profile
    profile: () => '/profile',
}