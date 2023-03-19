import React from "react";
import Container from "./components/Container";
import DropBox from "./components/DropBox";
import { useSession } from "next-auth/react";

export default function profile() {
  const { data: session } = useSession();
  let userEmail = session.user.email;

  return (
    <Container>
      <div className='mt-32 flex flex-col justify-start items-center max-w-5xl w-full mx-auto mb-16 border-gray-200 dark:border-gray-700"'>
        <div className="mb-10">
          <h1 className="text-gray-200 text-[5rem]">My Profile</h1>
        </div>
        {/* onSubmit={} */}
        <form id="profileForm" className="items-start">
          <div>
            <h1 className="text-gray-200 text-[3rem]">Personal Information:</h1>
            <div className="italic text-gray-200 text-[1.2rem] gap-4 w-full">
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="First Name"
                  name="name"
                  id="name"
                  required
                />
                <label htmlFor="name" className="form__label">
                  First Name
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="First Name"
                  name="last"
                  id="last"
                  required
                />
                <label htmlFor="last" className="form__label">
                  Last Name
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Pronouns"
                  name="Pronouns"
                  id="Pronouns"
                  required
                />
                <label htmlFor="Pronouns" className="form__label">
                  Pronouns
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Email"
                  name="Email"
                  id="Email"
                  required
                />
                <label htmlFor="Email" className="form__label">
                  Email
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Phone Number"
                  name="phone"
                  id="phone"
                  required
                />
                <label htmlFor="phone" className="form__label">
                  Phone Number
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Day of Birth"
                  name="birth"
                  id="birth"
                  required
                />
                <label htmlFor="birth" className="form__label">
                  Day of Birth
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Current Residence"
                  name="Residence"
                  id="Residence"
                  required
                />
                <label htmlFor="Residence" className="form__label">
                  Current Residence
                </label>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <h1 className="text-gray-200 text-[3rem]">Academic Information:</h1>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Education"
                name="education"
                id="education"
                required
              />
              <label htmlFor="education" className="form__label">
                Education
              </label>
            </div>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Experience"
                name="Experience"
                id="Experience"
                required
              />
              <label htmlFor="Experience" className="form__label">
                Experience
              </label>
            </div>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Interests"
                name="Interests"
                id="Interests"
                required
              />
              <label htmlFor="Interests" className="form__label">
                Interests
              </label>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col items-start justify-start">
                <DropBox text={"text"} id={"text"} />
                <DropBox text={"text"} id={"text1"} />
              </div>
              <div className="flex flex-col items-end justify-end">
                <DropBox text={"text"} id={"text2"} />
                <DropBox text={"text"} id={"text3"} />
              </div>
            </div>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Personal Goals or Aspirations in Life"
                name="Goals"
                id="Goals"
                required
              />
              <label htmlFor="Goals" className="form__label">
                Personal Goals or Aspirations in Life
              </label>
            </div>
          </div>
          <div className="items-end">
            <button className="button-68 my-7 " role="button" type="submit">
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
