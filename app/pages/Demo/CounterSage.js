import PropTypes from 'prop-types'
import { connect } from 'dva'

import Counter from '../../components/Counter'


const CounterSage = (props) => {
  const {
    counter, dispatch,
  } = props
  // console.log(props)
  return (
    <Counter
      value={counter}
      onIncrement={() => dispatch({
        type: 'counter/increment',
      })}
      onDecrement={() => dispatch({
        type: 'counter/decrement',
      })}
      onIncrementIfOdd={() => dispatch({
        type: 'counter/incrementIfOdd',
      })}
      onIncrementAsync={() => dispatch({
        type: 'counter/incrementAsync',
      })}
    />
  )
}

CounterSage.propTypes = {
  counter: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ counter }) => ({
  counter,
}))(CounterSage)
