import Form from '../components/Form'
import React, {useEffect} from "react";

const NewPet = () => {
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

  const petForm = {
    name: '',
    owner_name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
    user: "test"
  }

  useEffect(async () => {
    await makeRequest();
  }, []);

  return <Form formId="add-pet-form" petForm={petForm} />
}

export default NewPet
