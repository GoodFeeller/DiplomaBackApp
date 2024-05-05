
export enum AppErrors {
    EMAIL_EXIST = "User with this email is exist",
    WRONG_AUTH = "Wrong email or password",
    EMAIL_DONT_EXIST = "User with this email doesn't exist",
    WRONG_CODE = "Wrong code",
    UPDATE_ERROR = "Server error",
    NO_WORK = "User have no work",
    UNCONFIRMED = "Account is unconfirmed",
    CONFIRMED = "Account is alredy confirmed",
    WRONG_CONF_KEY = "Invalid confirm key",
    INVALID_EMAIL = "Invalid e-mail",
    NO_IMAGE = "This account doesn't have profile image",
    ONLY_ADMIN = "This request avilable only for admin",
    ANOTHER_WORK = "This user have another work",
    ONLY_ADMIN_OR_OPERATOR = "This request avilable only for admin or operator",
    NOT_OPERATOR = "You are not operator for this user",
    NOT_YOUR_OPERATOR = "This user is not your operator"
}