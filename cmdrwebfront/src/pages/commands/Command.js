import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useState } from "react/cjs/react.development";

export const Command = (props) => {
  const { kitchen, date, time, waiter, table, _id } = props.command;

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.60:5000/api/course/command/${_id}`)
      .then((res) => res.json())
      .then((res) => setCourses(res));
  });

  const mainCourses = courses.filter((course) => !course.isStarter);
  const starterCourses = courses.filter((course) => course.isStarter);

  const Course = (props) => {
    let { plateName, plateToken, extra, status, amount } = props.course;

    if (!extra) extra = "";

    return (
      <ListGroup.Item>
        {" "}
        <div style={{ fontFamily: "helvetica" }}>
          {`${amount} | ${plateName}`}
          {extra != " " ? <div>{extra}</div> : null}
        </div>
      </ListGroup.Item>
    );
  };

  const TKTCourse = (props) => {
    let { plateToken, extra, status, amount, plateName } = props.course;

    if (!extra) extra = "";

    return (
      <div>
        <div style={{ fontSize: 22 }}>
          <span style={{fontFamily: 'monospace'}}>
          {amount}  {' '}
          </span>
          <span style={{color: "gray"}}>
            | {'  '}
          </span>
          {`${plateName}`}
          {extra != " " ? (
            <div style={{ fontSize: 15,
          }}>
              {"  \t"} {extra}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          display: "float",
          width: 400,
          padding: 20,
          margin: 20,
          boxShadow: "#80808085 0px 5px 20px 1px",
          // fontFamily: "helvetica",
          fontSize: 20,
          float: "left",
          display: "inline",
          borderRadius: 10
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 21 }}>
          {" "}
          Cocina: {kitchen}{" "}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div> Fecha: {date} </div>

          <div> Hora: {time} </div>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div> Mozo: {waiter} </div>
          <div> Mesa: {table} </div>
        </div>
        <hr />
        <div style={{margin: 20}}>
          {starterCourses.map((course) => (
            <TKTCourse course={course} />
          ))}
          {starterCourses != "" ? (
            // <div style={{ fontSize: 21 }}>1 --------------------- </div>
            <hr />
          ) : null}
          {mainCourses.map((course) => (
            <TKTCourse course={course} />
          ))}
        </div>
      </div>

      {/* <Card
        bg="light"
        key={_id}
        style={{
          margin: 10,
          width: "fit-content",
          float: "left",
          display: "inline",
        }}
        className="mb-2"
      >
        <Card.Body>
          <ListGroup variant="light">
            <ListGroup.Item> Fecha: {date} </ListGroup.Item>
            <ListGroup.Item> Hora: {time} </ListGroup.Item>
            <ListGroup.Item> Mozo: {waiter} </ListGroup.Item>
            <ListGroup.Item> Mesa: {table} </ListGroup.Item>
            <ListGroup.Item> Cocina: {kitchen} </ListGroup.Item>
          </ListGroup>
          <div style={{}}>
            {starterCourses ? "Entradas" : null}
            <ListGroup variant="light">
              {starterCourses.map((course) => (
                <Course course={course} />
              ))}
            </ListGroup>

            {mainCourses ? "Principales" : null}
            <ListGroup variant="light">
              {mainCourses.map((course) => (
                <Course course={course} />
              ))}
            </ListGroup>
          </div>
        </Card.Body>
      </Card> */}
    </>
  );

  // return (
  // <Card
  //   bg="light"
  //   key={_id}
  //   style={{
  //     margin: 10,
  //     width: "fit-content",
  //     float: "left",
  //     display: "inline",
  //   }}
  //   className="mb-2"
  // >
  //   <Card.Body>
  //     <ListGroup variant="light">
  //       <ListGroup.Item> Fecha: {date} </ListGroup.Item>
  //       <ListGroup.Item> Hora: {time} </ListGroup.Item>
  //       <ListGroup.Item> Mozo: {waiter} </ListGroup.Item>
  //       <ListGroup.Item> Mesa: {table} </ListGroup.Item>
  //       <ListGroup.Item> Cocina: {kitchen} </ListGroup.Item>
  //     </ListGroup>
  //     <div style={{}}>
  //       {starterCourses ? "Entradas" : null}
  //       <ListGroup variant="light">
  //         {starterCourses.map((course) => (
  //           <TKTCourse course={course} />
  //         ))}
  //       </ListGroup>

  //       {mainCourses ? "Principales" : null}
  //       <ListGroup variant="light">
  //         {mainCourses.map((course) => (
  //           <TKTCourse course={course} />
  //         ))}
  //     </div>
  // );
};
