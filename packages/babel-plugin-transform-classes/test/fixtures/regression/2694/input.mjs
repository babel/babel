import BaseFoo from './BaseFoo';

export default class SubFoo extends BaseFoo {
  static talk() {
    super.talk();
    console.log('SubFoo.talk');
  }
}
