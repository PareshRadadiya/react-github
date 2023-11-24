    import { AnyAction, Dispatch } from 'redux';

    export const USER_REPOSITARY_DATA = 'USER_REPOSITARY_DATA'
    export const USER_ORGANIZATION = 'USER_ORGANIZATION'
    export const GET_USERNAME = 'GET_USERNAME'

    export const fetchUserData = (userName: string) => {
        
        return async (dispatch: Dispatch<AnyAction>) => {
            try {
                const UserRepositary: any[] = await fetch(`https://api.github.com/users/${userName}/repos`).then(
                    (response) => response.json()
                );
                dispatch({
                    type: 'USER_REPOSITARY_DATA',
                    payload: UserRepositary,
                });
            } catch (error) {
                console.log('error', error);
            }
        }
    }

    export const fetchUserName = (userName: string) => {
        
        return async (dispatch: Dispatch<AnyAction>) => {
            try {
                const GetUserName: any[] = await fetch(`https://api.github.com/users/${userName}`).then(
                    (response) => response.json()
                );
                console.log('GetUserName', JSON.stringify(GetUserName))
                dispatch({
                    type: 'GET_USERNAME',
                    payload: GetUserName,
                });
            } catch (error) {
                console.log('error', error);
            }
        }
    }

    export const fetchOrganizationData = (userName: string) => {
        return async (dispatch: Dispatch<AnyAction>) => {
            try {
                const UserOrganization: any[] = await fetch(`https://api.github.com/users/${userName}/orgs`).then(
                    (response) => response.json()
                );
                dispatch({
                    type: 'USER_ORGANIZATION',
                    payload: UserOrganization,
                });
            } catch (error) {
                console.log('error', error);
            }
        }
    }