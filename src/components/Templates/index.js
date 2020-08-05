
import NavMenu from './NavMenu'
import TableModel from './TableModel'
// import TreeTable from './TreeTable'
import TreeGrid from './TreeGrid'

const Template = {
    install: function(Vue){
        Vue.component('NavMenu',NavMenu);
        Vue.component('TableModel',TableModel);
        // Vue.component('tree-table',TreeTable);
        Vue.component('tree-grid',TreeGrid);
    }
}
export default Template