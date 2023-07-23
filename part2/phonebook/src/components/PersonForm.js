const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, name, number}) => (
  <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">name</label> <input type="text" id ="nameInput" value={name} onChange={handleNameChange} /><br/>
        <label htmlFor="numberInput">number</label> <input type="text" id="numberInput" value={number} onChange={handleNumberChange} /><br/>
        <button>
          add
        </button>
  </form>
)
 export default PersonForm;
