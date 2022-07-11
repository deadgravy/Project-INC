const MachineCards = () => {
    return (
        <div className='card'>
            <div className='machineStatus disconnected'>

            </div>
            <div className='machineDetails p-2'>
                <h4>Testing Machine</h4>
                <p className='text-md text-gray-500'>Last connected time: 00:30 08/06</p>
                <p className='text-sm text-gray-500 mb-0'>435431</p>
            </div>
        </div>
    )
}

export default MachineCards;