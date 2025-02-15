export default function NotFound(): React.ReactNode {
  return (
    <>
      <div className="m-16"></div>
      <div className="m-4 w-fit p-4">
        <span className="text-3xl font-extrabold text-teal-300">Oh No!</span>
        <br />
        <span className="text-lg font-bold">
          Error 404 - The page could not be found.
        </span>
      </div>
    </>
  );
}
