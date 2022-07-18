window.onload = function () {
    let bigPicIndex = 0;
    let price = document.querySelector("#price");
    let goodsDetail = goodData.goodsDetail;
    priceSingle = goodsDetail.price;
    price.innerText = priceSingle;
    let amount = 1;
    function navPathDataBind() {
        let navPath = document.querySelector("#navPath");
        let goodDataPath = goodData.path;
        for (let i = 0; i < goodDataPath.length; i++) {
            let aNode = document.createElement("a");
            let iNode = document.createElement("i");
            if (i < goodDataPath.length - 1) {
                aNode.href = goodDataPath[i].url;
                aNode.innerText = goodDataPath[i].title;
                iNode.innerText = " / ";
            } else {
                aNode.innerText = goodDataPath[i].title;
            }
            navPath.appendChild(aNode);
            navPath.appendChild(iNode);
        }
    }
    navPathDataBind();
    function bigPicEffect() {
        let leftTopPic = document.querySelector("#leftTopPic");
        // let magnifier=document.querySelector("#magnifier");
        let goodContentMain = document.querySelector("#goodContentMain");
        leftTopPic.onmouseenter = function () {
            let magnifier = document.createElement("div");
            let rightPic = document.createElement("div");
            let bigPic = document.createElement("img");
            let bigPicsArr = goodData.imagessrc;
            magnifier.id = "magnifier";
            bigPic.id = "bigPic";
            bigPic.src = bigPicsArr[bigPicIndex].b;
            rightPic.id = "rightPic";
            rightPic.appendChild(bigPic);
            goodContentMain.appendChild(rightPic);
            leftTopPic.appendChild(magnifier);
            leftTopPic.onmousemove = function (event) {
                let left = event.clientX - leftTopPic.getBoundingClientRect().left - magnifier.offsetWidth / 2;
                let top = event.clientY - leftTopPic.getBoundingClientRect().top - magnifier.offsetHeight / 2;
                if (left < 0) { left = 0 };
                if (top < 0) { top = 0 };
                if (left > leftTopPic.clientWidth - magnifier.offsetWidth) {
                    left = leftTopPic.clientWidth - magnifier.offsetWidth;
                };
                if (top > leftTopPic.clientHeight - magnifier.offsetHeight) {
                    top = leftTopPic.clientHeight - magnifier.offsetHeight;
                };
                magnifier.style.left = left + "px";
                magnifier.style.top = top + "px";
                bigPic.style.left = -2 * left + "px";
                bigPic.style.top = -2 * top + "px";
            }
            leftTopPic.onmouseleave = function () {
                goodContentMain.removeChild(rightPic);
                leftTopPic.removeChild(magnifier);
            }
        }
    }
    bigPicEffect();
    //dynamically add small pics into page starts here
    function addSmalllPicsIntoPage() {
        let smallPicsArr = goodData.imagessrc;
        let smallPicsContainer = document.querySelector("#smallPicsContainer")
        smallPicsArr.map(item => {
            let smallPics = document.createElement("img");
            smallPics.className = "leftSmallPics";
            smallPics.src = item.s;
            smallPicsContainer.appendChild(smallPics);
            // return leftSmallPicsContainer;
        })
    }
    addSmalllPicsIntoPage()
    // dynamically add small pics into page ends here
    // small pics click effect starts here
    function smallPicClick() {
        let leftSmallPics = document.querySelectorAll(".leftSmallPics");
        for (let i = 0; i < leftSmallPics.length; i++) {
            let leftTopPic = document.querySelector("#leftTopPic img");
            leftTopPic.src = leftSmallPics[0].src;
            leftSmallPics[i].onclick = function () {
                leftTopPic.src = leftSmallPics[i].src;
                bigPicIndex = i;
            }
        }
    }
    smallPicClick();
    // small pics click effect ends here
    // small pics left slide effect ends here
    function smallPicsSlide() {
        let leftSlide = document.querySelector("#leftSlide");
        let rightSlide = document.querySelector("#rightSlide");
        let smallPicsContainer = document.querySelector("#smallPicsContainer")
        let smallPicsArr = goodData.imagessrc;
        let left = 0;
        leftSlide.onclick = function () {
            let dingshiqi1 = setInterval(() => {
                left = left - 1.56;
                if (left <= (smallPicsArr.length - 5) * -78) {
                    left = (smallPicsArr.length - 5) * -78;
                }
                smallPicsContainer.style.left = left + "px";
            }, 20);
            setTimeout(() => {
                clearInterval(dingshiqi1);
            }, 1000)

        }
        rightSlide.onclick = function () {
            let dingshiqi2 = setInterval(() => {
                left = left + 1.56;
                if (left >= 0) {
                    left = 0;
                }
                smallPicsContainer.style.left = left + "px";
            }, 20);
            setTimeout(() => {
                clearInterval(dingshiqi2);
            }, 1000)

        }
    }
    smallPicsSlide();
    // small pics left slide effect ends here
    // right top product information dynamical display starts here
    function rightProductInfoDynamicalDisplay() {
        let crumbData = goodsDetail.crumbData;
        let productTitle = document.querySelector("#productInfoTop h3");
        let promotionAd = document.querySelector("#promotionAd");
        let commentsNumber = document.querySelector("#commentsNumber");
        let discountTag = document.querySelector("#discountTag");
        let discountInfo = document.querySelector("#discountInfo");
        let supportContent = document.querySelector("#supportContent");
        let deliveryAddress = document.querySelector("#deliveryAddress");
        let select = document.querySelector("#select");
        let originalPrice = document.querySelector("#originalPrice");
        let totalPrice = document.querySelector("#totalPrice");
        let checkBoxes = document.querySelectorAll(".checkBox");
        productTitle.innerText = goodsDetail.title;
        promotionAd.innerText = goodsDetail.recommend;
        commentsNumber.innerText = goodsDetail.evaluateNum;
        discountTag.innerText = goodsDetail.promoteSales.type;
        discountInfo.innerText = goodsDetail.promoteSales.content;
        supportContent.innerText = goodsDetail.support;
        deliveryAddress.innerText = goodsDetail.address;
        let priceChangeArr = [];
        for (let i = 0; i < crumbData.length; i++) {
            let buttonsArr = [];
            priceChangeArr.push(0);
            let selectItem = document.createElement("div");
            selectItem.className = "selectItem"
            let itemTag = document.createElement("div");
            itemTag.className = "itemTag";
            itemTag.innerText = crumbData[i].title;
            selectItem.appendChild(itemTag);
            for (let j = 0; j < crumbData[i].data.length; j++) {
                let buttons = document.createElement("button");
                buttons.className = "selectButton";
                buttons.innerText = crumbData[i].data[j].type;
                selectItem.appendChild(buttons);
                buttonsArr.push(buttons);
                buttonsArr[0].style.color = "#cc1122";
                buttonsArr[0].style.fontWeight = "bold";
                buttons.onclick = function () {
                    for (let k = 0; k < buttonsArr.length; k++) {
                        buttonsArr[k].style.color = "#666";
                        buttonsArr[k].style.fontWeight = "normal";
                    }
                    this.style.color = "#cc1122";
                    this.style.fontWeight = "bold";
                    priceChangeArr[i] = crumbData[i].data[j].changePrice;
                    // console.log(priceChangeArr);
                    let sum = priceChangeArr.reduce((sum, item) => {
                        return sum + item;
                    }, 0)
                    // console.log(sum);
                    priceSingle = goodsDetail.price + sum;
                    price.innerText = priceSingle * amount;
                    originalPrice.innerText = priceSingle;
                    for(let l=0; l<checkBoxes.length; l++){
                        if(checkBoxes[l].checked){
                            priceSingle = priceSingle+Number(checkBoxes[l].value);
                        }
                    }
                    totalPrice.innerText=priceSingle;
                }
            }
            select.appendChild(selectItem);
        }
    }
    rightProductInfoDynamicalDisplay();
    // right top product information dynamical display ends here
    // add to cart information dynamical display startss here
    function addCartInfoDynamicallyDisplay() {
        let quantityDisplay = document.querySelector("#quantityDisplay");
        let quantityAdd = document.querySelector("#quantityAdd");
        let quantityMinus = document.querySelector("#quantityMinus");
        let quantityToBuy = 1;
        quantityDisplay.innerText = quantityToBuy;
        quantityAdd.onclick = function () {
            quantityToBuy = Number(quantityToBuy) + 1;
            quantityDisplay.innerText = quantityToBuy;
            price.innerText = Number(priceSingle) * Number(quantityToBuy);
            amount = quantityToBuy;
        }
        quantityMinus.onclick = function () {
            quantityToBuy = Number(quantityToBuy) - 1;
            if (quantityToBuy < 0) {
                quantityToBuy = "";
            }
            quantityDisplay.innerText = quantityToBuy;
            price.innerText = Number(priceSingle) * Number(quantityToBuy);
            amount = quantityToBuy;
        }
    }
    addCartInfoDynamicallyDisplay()
    // add to cart information dynamical display ends here
    function bottomLeftSelect() {
        let bottomLeftTitle1 = document.querySelector(".bottomLeftTitle1");
        let bottomLeftTitle2 = document.querySelector(".bottomLeftTitle2");
        let bottomContent1 = document.querySelector("#bottomContent1");
        let bottomContent2 = document.querySelector("#bottomContent2");
        bottomLeftTitle1.onclick = function () {
            bottomLeftTitle1.style.borderTop = "3px solid #e1251b";
            bottomLeftTitle2.style.borderTop = "3px solid #fff";
            bottomLeftTitle1.style.borderBottom = "1px solid #fff";
            bottomLeftTitle2.style.borderBottom = "1px solid lightgrey";
            bottomContent1.style.zIndex = 10;
            bottomContent2.style.zIndex = 0;
        }
        bottomLeftTitle2.onclick = function () {
            bottomLeftTitle2.style.borderTop = "3px solid #e1251b";
            bottomLeftTitle1.style.borderTop = "3px solid #fff";
            bottomLeftTitle2.style.borderBottom = "1px solid #fff";
            bottomLeftTitle1.style.borderBottom = "1px solid lightgrey";
            bottomContent2.style.zIndex = 10;
            bottomContent1.style.zIndex = 0;
        }

    }
    bottomLeftSelect();
    function itemsAndPriceCal() {
        let totalPrice = document.querySelector("#totalPrice");
        let checkBoxes = document.querySelectorAll(".checkBox");
        let counterSpan=document.querySelector("#counterSpan");
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].onclick = function () {
                let finalPrice = priceSingle;
                let counter =0;
                for (let j = 0; j < checkBoxes.length; j++) {
                    if (checkBoxes[j].checked) {
                        counter=counter+1;
                        finalPrice = finalPrice + Number(checkBoxes[j].value);
                    }
                }
                totalPrice.innerText = finalPrice;
                counterSpan.innerText=counter;
            }
        }
    }
    itemsAndPriceCal();
    function bottomRightBottomContentChange() {
        let buttons = document.querySelectorAll(".bottomRightBottomButton");
        let contents = document.querySelectorAll(".bottomRightBottomContent");
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function () {
                for (let j = 0; j < buttons.length; j++) {
                    buttons[j].style.backgroundColor = "#fff";
                    buttons[j].style.color="black";
                }
                buttons[i].style.backgroundColor = "#e1251b";
                buttons[i].style.color="#fff";
                for (let k = 0; k < contents.length; k++) {
                    contents[k].style.display = "none";
                }
                contents[i].style.display = "block";
            }
        }
    }
    bottomRightBottomContentChange();
    function rightSideBarClick (){
        let rightSideBar=document.querySelector("#rightSideBar");
        let crossIcon=document.querySelector("#crossIcon");
        let flag=true;
        crossIcon.onclick=function(){
            if(flag){
                crossIcon.className="crossIconActive";
                rightSideBar.className="sideBarActive";
            } else {
                crossIcon.className="crossIconInactive";
                rightSideBar.className="sideBarInactive";
            }
            flag=!flag;
        }

    }
    rightSideBarClick ();
}