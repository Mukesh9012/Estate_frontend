import React from "react";

function Contact() {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "4a235242-d331-4350-b140-d24006ee00e5");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("");
            alert("Form Submitted Successfully")
            event.target.reset();
        } else {
            console.log("Error", data);
            alert(data.message)
            setResult("");
        }
    };

    return (
        <div id="Contact">
            <div className='flex items-center justify-center content-center mb-15 mt-15'>
                <div className="highlight  mx-2 px-2">
                    <p className='text-4xl font-bold m-2 '>Contact<span className='underline font-normal ml-2 text-3xl'>With Us</span></p>
                    <p className='font-extralight'>Ready to Make a Move? Let's Build Your Future together</p>
                </div>
            </div>
            <form action="" onSubmit={onSubmit} className=' justify-center items-center  ' >
                <div className='flex justify-center items-center gap-10'>
                    <div className='   '>
                        <p className='mb-2 ml-3 font-mono'>Your Name</p>
                        <input type="text" placeholder='Your Name' name="name" className='border border-gray-300 rounded-2xl h-10 w-full text-left p-3 font-medium' required />

                    </div>
                    <div className='  '>
                        <p className='mb-2 ml-3 font-mono'>Your Email</p>
                        <input type="Email" placeholder='Your Email' name="Email" className='border border-gray-300 rounded-2xl h-10 w-full text-left p-2 font-medium' required />

                    </div>

                </div>
                <div className=' flex justify-center items-center flex-col'>
                    <div className='m-4'>
                        <p className='mb-2 ml-3 font-mono'>Message</p>
                        <textarea type="text" name="Message" placeholder='Message' className='h-20 border rounded-2xl border-gray-300 w-120 font-medium text-left p-3' required />

                    </div>
                    <div className='border border-gray-300 bg-blue-600 text-white h-10 w-40 rounded-4xl items-center justify-center content-center pl-8 mb-15 mt-10'>
                        <button type="submit" className='font-bold hover:cursor-pointer'>{result ? result : "Send Message"}</button>
                    </div>
                </div>

            </form>
            <span>{result}</span>

        </div>
    );
}

export default Contact;