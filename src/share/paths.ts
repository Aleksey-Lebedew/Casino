export const PATHS = {

    // sidebar
    main: () => '/',
    games: () => '/games',
    game: (id: string) => `/game/${id}`,
    allWinnings: () => '/winnings',
    winning: (id: string) => `/winnings/${id}`,
    profile: () => '/profile',
    activate: (uid = ':uid', token = ':token') => `/activate/${uid}/${token}`,

    // auth
    // signIn: () => '/signIn',
    // confirmed: () => '/confirmed',
    // // groups
    // groups: () => '/groups',
    // users: () => '/users',

    //profile
}