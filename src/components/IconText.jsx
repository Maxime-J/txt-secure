import styles from './IconText.module.css';

function IconText({ icon, children }){
  return (
    <div className={styles.div}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default IconText;
