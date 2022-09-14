// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Folder from 'mdi-material-ui/Folder'
import Account from 'mdi-material-ui/Account'
import Database from 'mdi-material-ui/Database'
import FolderOpen from 'mdi-material-ui/FolderOpen'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import FolderUpload from 'mdi-material-ui/FolderUpload'
import FolderDownload from 'mdi-material-ui/FolderDownload'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'DATA MASTER'
    },
    {
      title: 'Data Supplier',
      icon: Account,
      path: '/supplier'
    },
    {
      title: 'Data Barang',
      path: '/goods',
      icon: Database
    },
    {
      title: 'Data Jenis Barang',
      icon: FolderOpen,
      path: '/category'
    },
    {
      title: 'Data Satuan Barang',
      icon: Folder,
      path: '/unit'
    },
    {
      sectionTitle: 'DATA TRANSAKSI'
    },
    {
      title: 'Barang Masuk',
      icon: FolderDownload,
      path: '/incoming-items'
    },
    {
      title: 'Barang Keluar',
      icon: FolderUpload,
      path: '/exit-items'
    },
    {
      sectionTitle: 'Data Users'
    },
    {
      title: 'Data Users',
      icon: AccountGroup,
      path: '/users'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login'
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register'
    },
  ]
}

export default navigation
