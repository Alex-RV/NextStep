import React, { FormEvent, useEffect, useState } from 'react'
import Container from './components/Container'
import CheckBox from './components/CheckBox'
import { signOut, useSession, getSession } from 'next-auth/react';

interface FormData {
    first: string;
    last: string;
    pronouns: string;
    email: string;
    phone: string;
    birth: string;
    residence: string;
    education: string;
    experience: string;
    goals: string;
  }
  

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  // Get the form data
  const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

  // Create an object from the form data
  const data = {};
  formData.forEach((value, key) => {
    if (key === 'interests') {
      // If the key is "interests", extract the checked checkboxes
      const interests = [];
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
  console.log(data);

    const rawResponse = await fetch('/api/write_sheets', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();

    // print to screen
    alert(content.data.tableRange)
}




export default function Profile() {
    const [formData, setFormData] = useState<FormData>({
        first: '',
        last: '',
        pronouns: '',
        email: '',
        phone: '',
        birth: '',
        residence: '',
        education: '',
        experience: '',
        goals: '',
      });
    const [content, setContent] = useState<string[]>([])
    useEffect(() => {
        const readData = async () => {
            console.log("readData function");
            const range = "A1:K5000";
            const column = "D1:D5000";
            const searchValue = 'alexsandrr2005@gmail.com';
        
            const url = new URL('/api/read_sheets', window.location.href);
            url.searchParams.append('column', column);
            url.searchParams.append('searchValue', searchValue);
            url.searchParams.append('range', range);
        
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                  },
            });
            console.log("readData done");
            const content = await response.json();
            setContent(content);
            console.log("TEST!!!",content[0])

            setFormData({
                first: content[0],
                last: content?.[1] ,
                pronouns: content?.[2] ,
                email: content?.[3] ,
                phone: content?.[4] ,
                birth: content?.[5],
                residence: content?.[6],
                education: content?.[7] ?? '',
                experience: content?.[8] ?? '',
                goals: content?.[9] ?? '',
              });
            return content;
          };
          readData()
          
        
      }, [])
    
    const { data: session } = useSession();
    console.log("CONTENT!!",!content ? "" : content[1])
  
    
    // console.log(formData)
  
    // useEffect(() => {
    //   if (!session) {
    //     // User is not authenticated, redirect to login page
    //     window.location.href = '/login';
    //   }
    //   const content = await readData();
    // }, [session]);
  return (
    <Container>
        <div className='mt-32 flex flex-col justify-start items-center max-w-5xl w-full mx-auto mb-16 border-gray-200 dark:border-gray-700"'>
            <div className='mb-10'>
                {/* <h1 className='text-gray-200 text-[5rem]'>My Profile</h1> */}
                <h1 className='text-gray-200 text-[4rem]'>Welcome {session?.user?.name}!</h1>
            </div>
            <form id="profileForm" onSubmit={handleSubmit} className='items-start'>
                <div>
                    <h1 className='text-gray-200 text-[3rem]'>Personal Information:</h1>
                    <div className='italic text-gray-200 text-[1.2rem] gap-4 w-full'>
                    
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="First Name" defaultValue={formData.first} name="first" id='first' required />
                        <label htmlFor="name" className="form__label">First Name {formData.first}</label>
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

