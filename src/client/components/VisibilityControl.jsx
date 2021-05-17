import React from "react";
import swal from 'sweetalert'

const deleteAll = () =>{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover these imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted! please press crtl + r", {
        icon: "success",
      });
      localStorage.clear()
    } else {
      swal("Your imaginary file is safe!");
    }
  });
}
const VisbilityControl = (props) => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-sm">
          <input
            type="checkbox"
            className=""
            checked={props.isChecked}
            onChange={(e) => props.callback(e.target.checked)}
          />
          <label htmlFor="form-check-label">
            Show {props.description}
          </label>
          </div>
          <div className="col-sm">
            <button className="btn btn-danger" onClick={deleteAll}>
              !!
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default VisbilityControl;
