import { useState } from 'react';
import './ConfigPageComponent.scss';
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; 

type Config = {
  awsAccessKeyID: string;
  awsSecretAccessKey: string;
  awsRegion: string;
  mongoURI: string;
}

type ConfigFormProps = {
  onSave: (config: Config) => void;
  onDatabase: () => void;
}


function ConfigForm({ onSave, onDatabase }: ConfigFormProps ){
  const { register, handleSubmit, formState: { errors } } = useForm<Config>();
  const onSubmit: SubmitHandler<Config> = data => {
    onSave(data);
  }
//delete this: 
  // const [config, setConfig] = useState<Config>({
  //   awsAccessKeyID: '',
  //   awsSecretAccessKey: '',
  //   awsRegion: '',
  //   mongoURI: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setConfig((prevConfig) => ({
  //     ...prevConfig,
  //     [name as string]: value,
  //   }));
  // };


  const handleDatabase = (e: React.FormEvent) => {
    e.preventDefault();
    onDatabase();
  }



  return (
    <form className='config-form' onSubmit={handleSubmit(onSubmit)}>
      
      <input 
      {...register("awsAccessKeyID", { required: true })}
      placeholder='AWS Access Key'
      // onChange={handleChange} //you can delete this 
      />
      {errors.awsAccessKeyID && <p className='config-error'>AWS Access Key ID is required</p>}

      <input 
      {...register("awsSecretAccessKey", { required: true })}
      placeholder='AWS Secret Access Key' 
      // onChange={handleChange} //you can delete this 
      />
      {errors.awsSecretAccessKey && <p className='config-error'>AWS Secret Access Key is required</p>}

      <select {...register("awsRegion", { required: true })}  >
        <option value="">Select Region</option>
        <option value="us-east-1">US East 1</option>
        <option value="us-east-2">US East 2</option>
        <option value="us-west-1">US West 1</option>
      </select>
      {errors.awsRegion && <p className='config-error'>AWS Region is required</p>}
      
      <input 
      {...register("mongoURI", { required: true })}
      placeholder='MongoDB URI' 
      // onChange={handleChange}  // you can delete this 
      />
      {errors.mongoURI && <p className='config-error'>MongoDB URI is required</p>}

      <input type="submit"/>
      <button type='submit' onClick={handleDatabase}>Connect to DB</button>
    </form>
  )
}

export default ConfigForm;

