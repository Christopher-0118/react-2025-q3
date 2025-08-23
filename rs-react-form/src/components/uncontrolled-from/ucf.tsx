const UncontrolledForm = ({ onSuccess }: { onSuccess: () => void }) => {
  return (
    <>
      <h4>Uncontrolled Form</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSuccess();
        }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" data-autofocus />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
