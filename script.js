const fileinput = document.querySelector('.file-input');
const chooseimage = document.querySelector('.choose-img');
const saveimage = document.querySelector('.save-img');
const previewimg = document.querySelector('.image-preview img');
const disable = document.querySelector('.disable');
const filterOptions = document.querySelectorAll('.filter button');
const filtername = document.querySelector('.filter-name');
const filterSlider = document.querySelector('.slider input');
const filterval = document.querySelector('.slider .filter-val');

const rotateOptions = document.querySelectorAll('.rotate button');
const resetbtn = document.querySelector('.controls .reset-filter');
const downloadbtn = document.querySelector('.controls .row .save-img');


let brightness =  100 ;
let saturation =   100 ;
let inversion  = 0 ; 
let grayscale = 0 ;

let rotate = 0;
let scalex = 1;
let scaley = 1;






const applyfilters = () =>{
    previewimg.style.transform = `scaleX(${scalex}) rotate(${rotate}deg) scaleY(${scaley})`;
    previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
    // previewimg.style.filter = `saturate(${saturation}%)`;

}


const loadImage = () =>{
     let file = fileinput.files[0];
     if(!file){    // return if file is not selected;
        return;
     } 
    //  console.log(file);
    //  console.log(URL.createObjectURL(file));
     previewimg.src = URL.createObjectURL(file);
     previewimg.addEventListener('load',()=>{
        resetbtn.click();
        document.querySelector('.disable').classList.remove('disable');
     })
     
}

filterOptions.forEach((option ) =>{
    option.addEventListener('click',()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filtername.innerText = document.querySelector('.filter .active').innerText;

        if(option.id == 'brightness'){
            filterSlider.max = '100';
            filterSlider.value = brightness;
            filterval.innerText = brightness + '%';
        }
        else if(option.id == 'saturation'){
            filterSlider.max = '100'
            filterSlider.value = saturation;
            filterval.innerText = saturation + '%';
        }
        else if(option.id == 'inversion'){
            filterSlider.max='100'
            filterSlider.value = inversion;
            filterval.innerText = inversion + '%';
        }else{
            filterSlider.max = '100'
            filterSlider.value = grayscale;
            filterval.innerText = grayscale + '%';
        }
    })
})

const updateFilter = () => {
    //  console.log(filterSlider.value);
    //  const res = filterSlider.value * (100 / 200) ;
    //  filterval.innerText = res + '%' ;
    filterval.innerText = filterSlider.value + '%';
    const selectedFilter = document.querySelector('.filter .active');


    if(selectedFilter.id == 'brightness'){
        brightness = filterSlider.value;
    }else if(selectedFilter.id == 'grayscale'){
        grayscale = filterSlider.value;
    }else if(selectedFilter.id == 'inversion'){
        inversion = filterSlider.value;
    }else{
        saturation = filterSlider.value;
    }

    applyfilters();
}


rotateOptions.forEach((option) =>{
    option.addEventListener('click',()=>{
       if(option.id == 'left'){
           rotate = rotate - 90;
        // previewimg.style.transform = `rotate(${rotate}deg)`;
       }else if(option.id == 'right'){
        rotate = rotate + 90;
        // previewimg.style.transform = `rotate(${rotate}deg)`
       }else if(option.id == 'vertical'){
          
          scalex = -scalex;
        //   previewimg.style.transform = `scaleX(${scalex})`;
       }else {
          scaley = -scaley;
        //   previewimg.style.transform = `scaleY(${scaley})` ;
       }

       applyfilters();
    })
})



fileinput.addEventListener('change' , loadImage);
filterSlider.addEventListener('input',updateFilter);
resetbtn.addEventListener('click',() =>{
    // console.log('f')
     brightness =  100 ;
     saturation =   100 ;
     inversion  = 0 ; 
     grayscale = 0 ;


     rotate = 0;
     scalex = 1;
     scaley = 1;
    // previewimg.style.filter  = 'none';
    // previewimg.style.transform = 'none';
    // updateFilter();
    filterOptions[0].click();
    applyfilters();

})

downloadbtn.addEventListener('click' , () =>{
    //    console.log('clicked')
    //    console.log(previewimg);
       const canvas = document.createElement('canvas');
       const ctx = canvas.getContext('2d');
       canvas.width = previewimg.naturalWidth ;
       canvas.height = previewimg.naturalHeight ;
       ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
       ctx.translate(canvas.width / 2 , canvas.height / 2);
    //     ctx.rotate(rotate * Math.PI/180)
        if(rotate != 0){
          ctx.rotate(rotate * Math.PI / 180);
        }
       ctx.scale(scaley , scalex);
       ctx.drawImage(previewimg , -canvas.width / 2, -canvas.height / 2   , canvas.width , canvas.height);           // drawImage(imagetodraw , dx , dy , dwidth , dheight);
    //    document.body.appendChild(canvas);
        const link = document.createElement('a');
        link.download = 'image.jpg';
        link.href = canvas.toDataURL();
        link.click();
})
chooseimage.addEventListener('click' , () =>{
    fileinput.click();
})