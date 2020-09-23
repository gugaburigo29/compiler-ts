import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        spacing: number;
        palette: {
            red: string
        };
        typography: {

        };
    }
}
