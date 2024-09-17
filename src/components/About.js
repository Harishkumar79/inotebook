import React from 'react'

const About = () => {
  return (
    // <div className="container">
    //   <h1>This is About</h1>

    //   <p></p>
    // </div>
    <div className='container mx-3 '>
      <div className="col-md-6 d-flex flex-column justify-content-center">
        <div>
          <h1 style={{ fontWeight: "Bold" }}>Empowering  Students</h1>
          <p>An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee.</p>
        </div>
      </div>

      <div className= "mt-5 ">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Make something <span style={{ color: "#9C27B0" }}>Awesome</span> </h2>
            <p>iNotebook is made from the pain of writing all the things in notebook which is very hectic :(, So we mad an online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee.
              you can also access your notes anywhere in your world, at anytime time . So dont forget to Create note because creating anything is always important.
            </p>
          </div>
      </div>
    </div>
  )
}

export default About
