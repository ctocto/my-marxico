/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-09-11 11:20:35
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-09-18 18:34:02
 */
import DocumentList from '@components/DocumentList'
import UserSetting from '@components/UserSetting'
import PropTypes from 'prop-types'

function PageLayout({ children }) {
  return (
    <>
      <DocumentList />
      {children}
      <UserSetting />
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
