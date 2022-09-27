import {SignIn} from '@clerk/nextjs'

const SignInPage = () => (
    <div className={"container"}>
        <div className={"auth-card-container"}>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"/>
        </div>
    </div>
)

export default SignInPage
