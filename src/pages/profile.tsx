import React from 'react'
import Container from './components/Container'
import CheckBox from './components/CheckBox'

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    // Get the form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
  
    // Create an object from the form data
    const data: any = {};
    formData.forEach((value, key) => {
        key.toLowerCase()
      if (key === 'interests') {
        // If the key is "interests", extract the checked checkboxes
        const interests: string[] = [];
        const checkboxes = document.querySelectorAll('input[name="interests"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            interests.push(checkbox.value.toLowerCase());
        }
        });
        data[key] = interests;
      } else {
        data[key] = value;
      }
    });
    console.log(data)
  
    // Add the data to Firestore
    // db.collection('profiles').add(data)
    //   .then(() => {
    //     console.log('Data added successfully');
    //   })
    //   .catch((error) => {
    //     console.error('Error adding data:', error);
    //   });
  }

export default function profile() {
  return (
    <Container>
        <div className='mt-32 flex flex-col justify-start items-center max-w-5xl w-full mx-auto mb-16 border-gray-200 dark:border-gray-700"'>
            <div className='mb-10'>
                <h1 className='text-gray-200 text-[5rem]'>My Profile</h1>
            </div>
            {/* onSubmit={} */}
            <form id="profileForm" onSubmit={handleSubmit} className='items-start'>
                <div>
                    <h1 className='text-gray-200 text-[3rem]'>Personal Information:</h1>
                    <div className='italic text-gray-200 text-[1.2rem] gap-4 w-full'>
                    
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="First Name" name="name" id='name' required />
                        <label htmlFor="name" className="form__label">First Name</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="First Name" name="last" id='last' required />
                        <label htmlFor="last" className="form__label">Last Name</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Pronouns" name="pronouns" id='pronouns' required />
                        <label htmlFor="Pronouns" className="form__label">Pronouns</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Email" name="email" id='email' required />
                        <label htmlFor="Email" className="form__label">Email</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Phone Number" name="phone" id='phone' required />
                        <label htmlFor="phone" className="form__label">Phone Number</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Day of Birth" name="birth" id='birth' required />
                        <label htmlFor="birth" className="form__label">Day of Birth</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Current Residence" name="residence" id='residence' required />
                        <label htmlFor="Residence" className="form__label">Current Residence</label>
                    </div>
                    </div>
                </div>
                <div className='mt-7'>
                    <h1 className='text-gray-200 text-[3rem]'>Academic Information:</h1>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Education" name="education" id='education' required />
                        <label htmlFor="education" className="form__label">Education</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Experience" name="experience" id='experience' required />
                        <label htmlFor="Experience" className="form__label">Experience</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Personal Goals or Aspirations in Life" name="goals" id='goals' required />
                        <label htmlFor="Goals" className="form__label">Personal Goals or Aspirations in Life</label>
                    </div>
                    <div className='flex flex-row w-full'>
                        <div className='flex flex-col items-start justify-start'>
                            <CheckBox text={"Agriculture"} id={"agriculture"} value={"agriculture"}/>
                            <CheckBox text={"Art"} id={"art"} value={"art"}/>
                            <CheckBox text={"Architecture"} id={"architecture"} value={"architecture"}/>
                            <CheckBox text={"Biology"} id={"biology"} value={"biology"}/>
                            <CheckBox text={"Business"} id={"business"} value={"business"}/>
                            <CheckBox text={"Chemistry"} id={"chemistry"} value={"chemistry"}/>
                            <CheckBox text={"Geography"} id={"geography"} value={"geography"}/>
                            <CheckBox text={"Government"} id={"government"} value={"government"}/>
                            <CheckBox text={"History"} id={"history"} value={"history"}/>
                            <CheckBox text={"Law"} id={"law"} value={"law"}/>
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <CheckBox text={"Communications"} id={"communications"} value={"communications"}/>
                            <CheckBox text={"Computer Science"} id={"cs"} value={"cs"}/>
                            <CheckBox text={"Economics "} id={"economics"} value={"economics"}/>
                            <CheckBox text={"English"} id={"english"} value={"english"}/>
                            <CheckBox text={"Engineering"} id={"engineering"} value={"engineering"}/>
                            <CheckBox text={"Finance"} id={"finance"} value={"finance"}/>
                            <CheckBox text={"Management"} id={"management"} value={"management"}/>
                            <CheckBox text={"Marketing"} id={"marketing"} value={"marketing"}/>
                            <CheckBox text={"Mathematics"} id={"mathematics"} value={"mathematics"}/>
                            <CheckBox text={"Physics"} id={"physics"} value={"physics"}/>
                        </div>
                    </div>
                </div>
                <div className='items-end'>
                    <button className="button-68 my-7 "  role="button" type="submit"> Submit</button>
                </div>
                
            </form>
        </div>
    </Container>
  )
}
