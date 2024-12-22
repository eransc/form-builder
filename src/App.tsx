
import './App.css'
import FormBuilder from './components/FormBuilder/FormBuilder'
import formSchema from './formSchema';

function App() {
  const handleFormSubmit = (data: Record<string, string>) => {
    console.log('Submitted form data:', data);
  };

  return (
    <>
      <h1>Form Builder</h1>
      <FormBuilder config={formSchema} onSubmit={handleFormSubmit}/>
    </>
  )
}

export default App
