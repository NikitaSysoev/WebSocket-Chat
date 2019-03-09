export default function Api() {
  let id = 0;
  this.newId =(name = 'id')=> {
    ++id;
    return `${name}${id}`;
  }
}
