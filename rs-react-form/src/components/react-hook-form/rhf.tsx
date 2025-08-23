export function RhfForm({ onSuccess }: { onSuccess: () => void }) {
  return (
    <>
      <h4>React Hook Form</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSuccess();
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
