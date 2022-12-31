const express = require('express')
const cors = require('cors')
const path = require('path')
const app  = express()
const ats = require('arraybuffer-to-string')


app.use(cors())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})

const url = 'https://github.com/TayyabMunir01/Arduino_Light_Control_with_Nodejs/archive/refs/heads/main.zip'

// const url = 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg'

// const url = 'https://restcountries.com/v2/all'

// const url = 'https://get.videolan.org/vlc/3.0.18/win32/vlc-3.0.18-win32.exe'



var objUrl = 0
var dataToSend = 69

app.get('/users',(req,res)=>{
    async function getdata(){
        try{
            const data = await fetch(url, {method:'get',  mode: 'cors'})
            console.log(data)
            const response = await data.blob()
            objUrl = URL.createObjectURL(response)
            // link.href = objUrl
            // link.download = 'download'
            // link.click()
            console.log(response,objUrl)
            res.json(objUrl)
            res.end()
        }
        catch(err) {
            console.log(err)
        }
    }
    getdata()
    res.status(200)
    // res.end()
})

app.post('/download',(req,res)=>{
    async function getdata(){
        try{
            const data = await fetch(url, {method:'get',  mode: 'cors'})
            console.log(typeof data)
            const response = await data.blob()
            console.log(response, response.size, response.type,'blob1')

            const response2 = await response.arrayBuffer()
            // dataToSend = ats(response2)
            // console.log( typeof dataToSend, typeof response)

            const dataToSend = arrBuffToBase64(response2)

            const forblob2arr = base64ToArrBuff(dataToSend)

            const blob2 = new Blob([forblob2arr],{type:'image/jpeg'})
            console.log(blob2,'blob2')
            // console.log( dataToSend, response)

        //     response.arrayBuffer().then((res)=>{
        //     dataToSend = res    
        //     console.log(dataToSend, typeof dataToSend)
            
        // })
        console.log(response.size, response.type, typeof response2)
        
        // console.log(typeof data, typeof response)
        // objUrl = URL.createObjectURL(response)
        // link.href = objUrl
        // link.download = 'download'
        // link.click()
        // console.log(typeof response2,'sadfsa',dataToSend, JSON.stringify(response2))
        console.log(dataToSend[6],dataToSend[dataToSend.length-4],dataToSend.length)
        res.status(200).json({data:dataToSend, type:response.type})
            
        }
        catch(err) {
            console.log(err)
        }
    }
    getdata()
    // res.status(200)
})


app.listen(3000,'192.168.10.2',()=>{
    console.log('running on port 3000')
})



// console.log('working')
// const button = document.querySelector('button')
// const link = document.querySelector('a')

// const url = 'https://get.videolan.org/vlc/3.0.18/win32/vlc-3.0.18-win32.exe'
// const url = 'https://restcountries.com/v2/all'
// const url = 'https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-611.exe'
// const url = 'https://www.win-rar.com/postdownload.html?&L=0'
// https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-611.exe
// application/octet-stream
// const url = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
// const url = 'https://github.com/TayyabMunir01/Arduino_Light_Control_with_Nodejs/archive/refs/heads/main.zip'
// const url = 'https://binaries.templates.cdn.office.net/support/templates/en-us/tf02918880_win32.dotx'

// const url = 'https://github.com/git-for-windows/git/releases/download/v2.39.0.windows.2/Git-2.39.0.2-64-bit.exe'

// async function getdata(){
//     try{
//         const data = await fetch(url, {method:'get',  mode: 'cors'})
//         console.log(data)
//         const response = await data.blob()
//         const objUrl = URL.createObjectURL(response)
//         link.href = objUrl
//         link.download = 'download'
//         link.click()
//         console.log(response,objUrl)
        
//     }
//     catch(err) {
//         console.log(err)
//     }
// }

// button.addEventListener('click',getdata)

// var uint8 = new Uint8Array([65,12,123,123,3])
// console.log(ats(uint8), typeof uint8)

console.log('wornign')



function arrBuffToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return btoa( binary );
}

function base64ToArrBuff(base64) {
    var binary_string =  atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}