"use client";

import { useState } from "react";
import styles from "./variableInput.module.css";
import { FaPlus, FaTrashCan } from "react-icons/fa6";

const VariableInput = ({ productVariables }) => {
  const [variables, setVariables] = useState(
    productVariables || [{ key: "", price: "", stocks: "" }]
  );

  const addVariableHandler = async () => {
    setVariables([...variables, { key: "", price: "", stocks: "" }]);
  };

  // 更新特定規格與價錢的值
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...variables];
    list[index][name] = value;
    setVariables(list);
  };

  // 刪除特定的規格與價錢
  const removeVariableHandler = (index) => {
    const list = [...variables];
    list.splice(index, 1);
    setVariables(list);
  };
  return (
    <div className={styles.container}>
      <h3>商品規格</h3>
      <input
        type="hidden"
        name="variables"
        value={JSON.stringify(variables)} // 使用逗號將陣列轉換為字串
        readOnly
      />
      {variables.map((variable, index) => (
        <div key={index} className={styles.flexBox}>
          <div className={styles.rowInput}>
            <label>規格</label>
            <input
              type="text"
              name="key"
              value={variable.key}
              onChange={(e) => handleChange(index, e)}
              placeholder="例如:一斤"
            />
          </div>
          <div className={styles.rowInput}>
            <label>價錢</label>
            <input
              type="text"
              name="price"
              value={variable.price}
              onChange={(e) => handleChange(index, e)}
              placeholder="例如:300"
            />
          </div>
          <div className={styles.rowInput}>
            <label>庫存</label>
            <input
              type="text"
              name="stocks"
              value={variable.stocks}
              onChange={(e) => handleChange(index, e)}
              placeholder="例如:10"
            />
          </div>
          {/* 刪除規格與價錢的按鈕 */}
          <div
            className={styles.cancelIcon}
            onClick={() => removeVariableHandler(index)}
          >
            <FaTrashCan />
          </div>
        </div>
      ))}
      {/* 增加規格與價錢的按鈕 */}
      <div className="lineButton" onClick={addVariableHandler}>
        <FaPlus />
        增加規格
      </div>
    </div>
  );
};

export default VariableInput;
