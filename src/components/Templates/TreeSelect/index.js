import option from './option'
import select from './select'

const treeSelect = {
    install: function(Vue){
        Vue.component('tree-option',option);
        Vue.component('tree-select',select);
    }
}
export default treeSelect