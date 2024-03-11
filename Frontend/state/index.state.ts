
export interface HomeInitialState {
    homeCalendar: string,
    csrfToken: string,
    employee_name: string,
    user_data: UserData
}

export const initialState: HomeInitialState = {
    homeCalendar: new Date().toString(),
    csrfToken: '',
    employee_name:'',
    user_data: {
        email: '',
        name: ''
    }
};

export interface UserData {
    email: string,
    name: string
}
