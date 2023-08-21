import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, {TreeItemProps,useTreeItem,TreeItemContentProps,} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { data } from './data';

const CustomContent = React.forwardRef(function CustomContent( props: TreeItemContentProps, ref,) {

  const { classes,className,label,nodeId,icon: iconProp,expansionIcon,displayIcon,} = props;
  const {disabled,expanded,selected,focused,handleExpansion,handleSelection,preventSelection,} = useTreeItem(nodeId);
  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>,) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>,) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-nemaxWxt-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

function CustomTreeItem(props: TreeItemProps) {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
}

export default function Component2() {

  const [ updatedData, setUpdatedData ] = React.useState<any>([]);

  const onChange = (checkProp:any) => {

    setUpdatedData( (prev:any) => {
      let val:any = prev;
      for( let i = 0; i < val?.length; i++ ){
        let flag:boolean = false;
        if(val[i]?.department === checkProp.target.id ){
          val[i].value = !val[i].value;
          flag = true
        }

        for(let j = 0; j < val[i]?.sub_departments?.length; j++){
          if(flag){
            val[i].sub_departments[j].value = val[i].value === true ? true : false;
          } else if(val[i]?.sub_departments[j]?.name === checkProp.target.id ){
            val[i].sub_departments[j].value = !val[i].sub_departments[j].value;
            break
          }
        }
        if(!flag){
          let found = val[i]?.sub_departments?.some( (e: { value: boolean; }) => e?.value === false );
          if(!found){
            val[i].value = true;
          } else{
            val[i].value = false;
          }
        }
      }
      return [...val];
    } )

  }

  React.useEffect( () => {
    for( let i = 0; i < data?.length; i++ ){
      let sub:any = [];
      for(let j = 0; j < data[i]?.sub_departments?.length; j++){
        sub.push({name:data[i]?.sub_departments[j],value:false})
      }
      setUpdatedData( (prev:any) => [ ...prev, {...data[i], sub_departments:sub, value: false}]);
    }
  },[] )

  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, width: 300, overflowY: 'none' }}
      style={{textAlign:'left',margin:'3rem 0 0 0'}}
    >
      {
        updatedData?.length > 0 && updatedData?.map( (item:any,index:any) => (
          <CustomTreeItem nodeId={index} label={<><input type='checkbox' id={item?.department} checked={item?.value} value={item?.value} onClick={onChange}/>{item?.department}</>} >
            {
              item?.sub_departments?.map( (subItem:any) => (
                <CustomTreeItem label={<><input type='checkbox' id={subItem?.name} checked={subItem?.value} value={subItem?.value} onChange={onChange} />{subItem?.name}</>} nodeId={''} />
              ) )
            }
          </CustomTreeItem>
        ) )
      }
    </TreeView>
  );
}