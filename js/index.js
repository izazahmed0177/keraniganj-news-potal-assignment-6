const loadAllCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const response = await fetch(url);
    const data = await response.json();
    // return data;
    // setAllCategory(data);
    // setAllCategory(data.data);
    setAllCategory(data.data.news_category);


    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => console.log(data.data))
}



const setAllCategory = async (categorys) => {

    // console.log(categorys)

    const categorysContainer = document.getElementById('categorys-container')




    for (let category of categorys) {
        // console.log(category.category_id)

        const categoryDiv = document.createElement('div');




        categoryDiv.innerHTML = `
            <li class="nav-item" >
                 <a class="nav-link active" onclick="loadCategoryDetails('${category.category_id}')" aria-current="page" href="#">${category.category_name}</a>
            </li>
    
            `
        categorysContainer.appendChild(categoryDiv)
    }



}



const loadCategoryDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    const res = await fetch(url);
    const data = await res.json();

    displayCategoryDetails(data)
    // displayCategoryDetails(data.data)
}

const displayCategoryDetails = async (details) => {
    console.log(details.status);
    console.log(details.data.length)



    const categoryDetailsContainer = document.getElementById('category-details-container')

    categoryDetailsContainer.textContent = ''




    if (details.status == false) {
        console.log('no data found')

        const noNewsMass = document.getElementById('no-news-massade');
        noNewsMass.classList.remove('d-none')

        const categoryElement = document.getElementById('category-element')
        categoryElement.innerText = `${details.data.length}`;

    } else {

        ///
        const noNewsMass = document.getElementById('no-news-massade');
        noNewsMass.classList.add('d-none')

        const categoryElement = document.getElementById('category-element')
        categoryElement.innerText = `${details.data.length}`;



        details.data.forEach(detail => {

            console.log(detail)



            const div = document.createElement("div");
            /////////

            div.innerHTML = `
            
            <div class="card mb-3 shadow" style="max-width: 100%;">
            <div class="row g-0">
    
                <div class="col-md-4">
                    <img src="${detail.image_url}" class="img-fluid h-100 rounded-start" alt="...">
                </div>
    
                <div class="col-md-8">
    
                    <div class="card-body">
                        <h5 class="card-title">${detail.title}</h5>
                        <p class="card-text">${detail.details.length > 310 ? detail.details.slice(0,310) + '...' : detail.details}</p>
                        <div>
                            <div class="d-flex flex-row mb-3 justify-content-between">
    
                            
                                <div class="p-2 d-inline ">
                                    <div class="p-2">
                                        
                                        <img src="${detail.author.img}" class="w-25  rounded-circle " alt="...">
                                        
                                        <div class="d-inline">
                                        <h5>${detail.author.name ? detail.author.name: 'No Author Found'}</h5>
                                            
                                            

                                            ${detail.author.published_date ? detail.author.published_date : 'no release Date found'}
                                        </div>
                                            
                                       
                                    </div>
                                </div>
    
    
                                <div class="p-2">
    
                                    <div class="d-flex flex-row">
                                        <i class="bi bi-eye"><svg xmlns="http://www.w3.org/2000/svg"
                                                width="16" height="16" fill="currentColor" class="bi bi-eye"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                <path
                                                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                            </svg></i>
                                        <p>${detail.total_view} M</p>
                                    </div>
    
                                </div>
                                <div class="p-2">
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div class="p-2">
                                    <button onclick="loadCategoryDetailsModal('${detail._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Details</button>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
            
            
            `;

            /////////

            categoryDetailsContainer.appendChild(div)

        });
        ////

        toggleSpinner(false);

    }

    // for (let detail of details) {
    //     console.log(detail)
    //     console.log(details.total_view);

    // }
}


//

const loadCategoryDetailsModal = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;

    const res = await fetch(url);
    const data = await res.json();

    // displayCategoryDetailsModal(data)
    displayCategoryDetailsModal(data.data)

}

const displayCategoryDetailsModal = async (detailModal) => {
    console.log(detailModal)

    for (let modalsDetail of detailModal) {

        console.log(modalsDetail)

        const modalTitle = document.getElementById('newsDetailModalLabel')
        modalTitle.innerText = modalsDetail.title;

        const newsDetails = document.getElementById('news-details');

        newsDetails.innerHTML = `
        
        <img class="img-fluid  rounded-start" src="${modalsDetail.image_url}"/>

        <p>${modalsDetail.details}</p>
        <p>Total View: ${modalsDetail.total_view ? modalsDetail.total_view:'No View'}  <spen>  Rating: ${modalsDetail.rating.number ? modalsDetail.rating.number :'No Rating'} </spen></p>
        <h5>Author: ${modalsDetail.author.name ? modalsDetail.author.name: 'No Author Found'}</h5>
        
        `;
    }


}

const toggleSpinner = isLoding => {
    const loaderSection = document.getElementById('loader')
    if (isLoding) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}






// loadCategoryDetails();
loadAllCategory();