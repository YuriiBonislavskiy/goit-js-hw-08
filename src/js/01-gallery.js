// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);

const galleryItemsRetdersString = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}"  onclick="return false;">
      <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
      />
    </a>
  </li>`;
  })
  .join("");

const galleryList = document.querySelector(".gallery");
galleryList.insertAdjacentHTML("beforeend", galleryItemsRetdersString);

const gallery = new SimpleLightbox(".gallery__item .gallery__link", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
