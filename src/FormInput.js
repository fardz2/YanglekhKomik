import { Container} from 'react-bootstrap';
// import {useState} from 'react'
import { useForm ,useWatch} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string().required(),
    password: yup.string().required(),
  });
  function IsolateReRender({ control }) {
    const firstName = useWatch({
      control,
      name: ['firstName','password'], // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
      defaultValue: 'faridz' // default value before the render
    });
  
    return (
        <>
            <div>{firstName}</div>
            
        </>
    )// only re-render at the component level, when firstName changes
  }
export default function FormInput(){
    const { register, handleSubmit, formState: { errors },reset ,control} = useForm({
        resolver: yupResolver(schema)
    });
    console.log(errors)
    // const [name, setName] = useState('');
    // const [password, setPassword] = useState('');

    // const data = {
    //     name : name,
    //     password :password
    // }
    // const changeName = (e)=>{
    //     setName(e.target.value)
    //     console.log(name)
    // }

    // const changePassword = (e)=>{
    //     setPassword(e.target.value)
    //     console.log(password)
    // }
    const submitLogin = (e)=>{
        
        
        // fetch('http://127.0.0.1:8000/api/users', {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     localStorage.setItem('id', data.id)
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
        console.log(e)
        reset()
    }

    
    return(
        <Container>
           <form onSubmit={handleSubmit(submitLogin)}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input className="form-control"  {...register("firstName",{ required: true })}/>
                    <p>{errors.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input className="form-control" id="exampleInputPassword1" {...register("password",{ required: true })}/>
                    <p>{errors.password?.message}</p>
                </div>
                <IsolateReRender control={control} />
                <button  className="btn btn-primary" >Submit</button>
            </form>
        </Container>
    
    )
}