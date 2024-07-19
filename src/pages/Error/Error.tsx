import clsx from 'clsx';
import React from 'react';
import error from "../../assets/images/404.png";
import style from "./error.module.scss";


const Error = () => {
    return (
      <section>
        <div className={style.error404}>
          <div className={style.error_img}>
            <img src={error} alt="404" />
          </div>
          <div className={style.error_content}>
            <h3>Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!</h3>
            <div className={style.list_contact}>
              <div className={style.itemct}>
                <p>Trở về trang chủ<br />bảo chung</p>
                <a href="/" className={clsx(style.link, style.link_yellow)}>
                  <i className={style.iconerror_tgdd} />
                </a>
              </div>
              <div className={style.itemct}>
                <p>Gọi hỗ trợ<br />(8h00 - 21h30)</p>
                <a href="tel:1900232460" className={clsx(style.link, style.link__yellow, style.link_tel)}>
                  1900
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Error;
  