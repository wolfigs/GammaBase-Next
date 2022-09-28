import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {SignedIn, SignedOut} from '@clerk/nextjs'
import dbConnect from '../lib/dbConnect'
import Pet from '../models/Pet'

const ClerkFeatures = () => (
    <Link href="/user">
        <a className={styles.cardContent}>
            <img src="/icons/layout.svg"/>
            <div>
                <h3>Explore features provided by Clerk</h3>
                <p>
                    Interact with the user button, user profile, and more to preview what
                    your users will see
                </p>
            </div>
            <div className={styles.arrow}>
                <img src="/icons/arrow-right.svg"/>
            </div>
        </a>
    </Link>
)

const SignupLink = () => (
    <Link href="/sign-up">
        <a className={styles.cardContent}>
            <img src="/icons/user-plus.svg"/>
            <div>
                <h3>Sign up for an account</h3>
                <p>
                    Sign up and sign in to explore all the features provided by Clerk
                    out-of-the-box
                </p>
            </div>
            <div className={styles.arrow}>
                <img src="/icons/arrow-right.svg"/>
            </div>
        </a>
    </Link>
)

const apiSample = `import { withSession } from '@clerk/nextjs/api'

export default withSession((req, res) => {
  res.statusCode = 200
  if (req.session) {
    res.json({ id: req.session.userId })
  } else {
    res.json({ id: null })
  }
})`

// Main component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
// const Main = () => (
//     <main className={styles.main}>
//         <h1 className={styles.title}>Welcome to your new app</h1>
//         <p className={styles.description}>Sign up for an account to get started</p>
//
//         <div className={styles.cards}>
//             <div className={styles.card}>
//                 <SignedIn>
//                     <ClerkFeatures/>
//                 </SignedIn>
//                 <SignedOut>
//                     <SignupLink/>
//                 </SignedOut>
//             </div>
//
//             <div className={styles.card}>
//                 <Link href="https://dashboard.clerk.dev">
//                     <a target="_blank" rel="noreferrer" className={styles.cardContent}>
//                         <img src="/icons/settings.svg"/>
//                         <div>
//                             <h3>Configure settings for your app</h3>
//                             <p>
//                                 Visit Clerk to manage instances and configure settings for user
//                                 management, theme, and more
//                             </p>
//                         </div>
//                         <div className={styles.arrow}>
//                             <img src="/icons/arrow-right.svg"/>
//                         </div>
//                     </a>
//                 </Link>
//             </div>
//         </div>
//
//         <APIRequest/>
//
//         <div className={styles.links}>
//             <Link href="https://docs.clerk.dev">
//                 <a target="_blank" rel="noreferrer" className={styles.link}>
//                     <span className={styles.linkText}>Read Clerk documentation</span>
//                 </a>
//             </Link>
//             <Link href="https://nextjs.org/docs">
//                 <a target="_blank" rel="noreferrer" className={styles.link}>
//                     <span className={styles.linkText}>Read NextJS documentation</span>
//                 </a>
//             </Link>
//         </div>
//     </main>
// )

const APIRequest = () => {
    React.useEffect(() => {
        if (window.Prism) {
            window.Prism.highlightAll()
        }
    })
    const [response, setResponse] = React.useState(
        '// Click above to run the request'
    )
    const makeRequest = async () => {
        setResponse('// Loading...')

        try {
            const res = await fetch('/api/getAuthenticatedUserId')
            const body = await res.json()
            setResponse(JSON.stringify(body, null, '  '))
        } catch (e) {
            setResponse(
                '// There was an error with the request. Please contact support@clerk.dev'
            )
        }
    }
    return (
        <div className={styles.backend}>
            <h2>API request example</h2>
            <div className={styles.card}>
                <button
                    target="_blank"
                    rel="noreferrer"
                    className={styles.cardContent}
                    onClick={() => makeRequest()}
                >
                    <img src="/icons/server.svg"/>
                    <div>
                        <h3>fetch('/api/getAuthenticatedUserId')</h3>
                        <p>
                            Retrieve the user ID of the signed in user, or null if there is no
                            user
                        </p>
                    </div>
                    <div className={styles.arrow}>
                        <img src="/icons/download.svg"/>
                    </div>
                </button>
            </div>
            <h4>
                Response
                <em>
                    <SignedIn>
                        You are signed in, so the request will return your user ID
                    </SignedIn>
                    <SignedOut>
                        You are signed out, so the request will return null
                    </SignedOut>
                </em>
            </h4>
            <pre>
        <code className="language-js">{response}</code>
      </pre>
        </div>
    )
}

// Footer component
const Footer = () => (
    <footer className={styles.footer}>
        Powered by{' '}
        <a href="https://clerk.dev" target="_blank" rel="noopener noreferrer">
            <img src="/clerk.svg" alt="Clerk.dev" className={styles.logo}/>
        </a>
        +
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
            <img src="/nextjs.svg" alt="Next.js" className={styles.logo}/>
        </a>
    </footer>
)

const Home = ({pets}) => (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico"/>

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta>
        </Head>
        <div>
            <Link href="/new">+ New</Link>
        </div>
        <br/>
        <br/>
        {/*<Main>*/}
        <APIRequest/>
        {pets.map((pet) => (
            <div key={pet._id}>
                <div className="card">
                    <img src={pet.image_url}/>
                    <h5 className="pet-name">{pet.name}</h5>
                    <div className="main-content">
                        <p className="pet-name">{pet.name}</p>
                        <p className="owner">Owner: {pet.owner_name}</p>

                        {/* Extra Pet Info: Likes and Dislikes */}
                        <div className="likes info">
                            <p className="label">Likes</p>
                            <ul>
                                {pet.likes.map((data, index) => (
                                    <li key={index}>{data} </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dislikes info">
                            <p className="label">Dislikes</p>
                            <ul>
                                {pet.dislikes.map((data, index) => (
                                    <li key={index}>{data} </li>
                                ))}
                            </ul>
                        </div>

                        <div className="btn-container">
                            <Link href="/[id]/edit" as={`/${pet._id}/edit`}>
                                <button className="btn edit">Edit</button>
                            </Link>
                            <Link href="/[id]" as={`/${pet._id}`}>
                                <button className="btn view">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        {/*</Main>*/}
        <Footer/>
    </div>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await Pet.find({}).sort({_id: -1})
    const pets = result.map((doc) => {
        const pet = doc.toObject()
        pet._id = pet._id.toString()
        return pet
    })

    return {props: {pets: pets}}
}

export default Home
