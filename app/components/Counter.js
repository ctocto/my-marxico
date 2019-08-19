import PropTypes from 'prop-types'

import styles from './style.module.less'

const Counter = ({
  value, onIncrement, onIncrementAsync, onDecrement, onIncrementIfOdd,
}) => (
  <div className={styles.Counter}>
    <div>
      Clicked:
      {' '}
      <span className={styles.Counter__yellow}>{value}</span>
      {' '}
      times
    </div>
    <button type="button" onClick={onIncrement}>+</button>
    {' '}
    <button type="button" onClick={onDecrement}>-</button>
    {' '}
    <button type="button" onClick={onIncrementIfOdd}>Increment if odd</button>
    {' '}
    <button type="button" onClick={onIncrementAsync}>Increment async</button>
  </div>
)

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
  onIncrementIfOdd: PropTypes.func.isRequired,
}

export default Counter
