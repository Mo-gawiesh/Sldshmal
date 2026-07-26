declare module "*.png" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: any;
  export default content;
}
declare module "*.webp" {
  const content: any;
  export default content;
}
declare module "*.svg" {
  const content: any;
  export default content;
}

interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
  clarity?: (...args: any[]) => void;
}
