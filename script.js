let dragged = null;

// document.querySelectorAll('draggable') => this will give you all the elements with 'draggable' class in the form of an array

// Attach event listeners once
document.querySelectorAll('.draggable').forEach(image => image.addEventListener('dragstart', (event) => {
    dragged = event.target; //store reference for the dragged element 
}))

// Add event listeners to all squares (dropzones) once
// document.querySelectorAll('dropzone') will give you all the elements with 'dropzone' class in the form of an array, these are our divs where our images are stored, 
document.querySelectorAll('.dropzone').forEach((square) => {
    square.addEventListener('dragover',(event) => {
        event.preventDefault()  //Necessary to allow dropping
    })

    square.addEventListener('drop',(event) => {
        event.preventDefault();

        const dropzone = event.currentTarget;

        // Determine if the dragged piece is black or white
        if(dragged && dragged.classList.contains("white-piece")){
            // Logic for white piece
            if(dropzone.classList.contains('whiteOccupied')){
                // can't place a white piece on a square occupied by another white piece
                return;
            }

            // Remove dragged piece from current square
            dragged.parentNode.classList.remove('whiteOccupied');
            dragged.parentNode.classList.add("empty");
            dragged.parentNode.removeChild(dragged);


            // remove the piece from the dropzone (if present)
            dropzone.childNodes.forEach((node) => {
                if(node.classList && node.classList.contains("pieces")){
                    dropzone.removeChild(node);
                }
            })
            

            // Add dragged piece to the new square
            dropzone.appendChild(dragged);
            if(dropzone.classList.contains('empty')){
                dropzone.classList.replace('empty','whiteOccupied')
            }else if(dropzone.classList.contains('blackOccupied')){
                dropzone.classList.replace('blackOccupied','whiteOccupied')
            }
        }

        if(dragged && dragged.classList.contains("black-piece")){
            // Logic for white piece
            if(dropzone.classList.contains('blackOccupied')){
                // can't place a white piece on a square occupied by another white piece
                return;
            }

            // Remove dragged piece from current square
            dragged.parentNode.classList.remove('blackOccupied');
            dragged.parentNode.classList.add("empty");
            dragged.parentNode.removeChild(dragged);


            // remove the piece from the dropzone (if present)
            dropzone.childNodes.forEach((node) => {
                if(node.classList && node.classList.contains("pieces")){
                    dropzone.removeChild(node);
                }
            })
            

            // Add dragged piece to the new square
            dropzone.appendChild(dragged);
            if(dropzone.classList.contains('empty')){
                dropzone.classList.replace('empty','blackOccupied')
            }else if(dropzone.classList.contains('whiteOccupied')){
                dropzone.classList.replace('whiteOccupied','blackOccupied')
            }
        }


    })
})







