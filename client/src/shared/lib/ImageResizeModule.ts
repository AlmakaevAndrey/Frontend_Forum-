import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Module = Quill.import('core/module');

class ImageResizeModule extends Module {
  quill: any;

  constructor(quill: any, options: any) {
    super(quill, options);
    this.quill - quill;

    this.quill.root.addEventListener('click', (e: any) => {
      if (e.target && e.target.tagName === 'IMG') {
        this.resizeImage(e.target);
      }
    });
  }
  resizeImage = (img: HTMLImageElement) => {
    img.style.resize = 'both';
    img.style.overflow = 'auth';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  };
}

Quill.register('modules/imageResize', ImageResizeModule);

export default ImageResizeModule;
