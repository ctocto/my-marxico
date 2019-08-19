/**
 * @Summary short description for the file
 * @Author: hefan
 * @Date: 2019-08-19 18:48:19
 *
 * @Last Modified by: hefan
 * @Last Modified time: 2019-08-19 19:08:04
 */
import styles from './style.module.less'

function Command() {
  const handleFullScreen = () => {
    document.getElementById('root').classList.toggle('fullScreen')
  }
  return (
    <nav className={styles.Command}>
      <ul>
        <li>
          <button type="button">home</button>
        </li>
        <li>
          <button type="button">home</button>
        </li>
        <li>
          <button type="button" onClick={handleFullScreen}>full</button>
        </li>
      </ul>
    </nav>
  )
}

export default Command
