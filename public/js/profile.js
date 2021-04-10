photo.addEventListener('change', async event => {
    let photoFile = event.target.files[0]

    try {

        let formdata = new FormData()
        formdata.append('photo', photoFile)

        console.log(formdata);

        let response = await fetch('/user/photo', {
            method: "POST",
            body: formdata
        })

        response = await response.json()

        if(response.ok){
            window.location.reload()
        } else {
            alert("Photo upload error")
        }
    }
    catch(e){

    }
})