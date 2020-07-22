export interface User {
    id?:                    number,
    name?:                  string,
    email?:                 string,
    created_at?:            Date,
    updated_at?:            Date,
    google_token?:          string,
    google_refresh_token?:  string,
    about?:                 string,
    api_key?:               string,
    karma?:                 number
}