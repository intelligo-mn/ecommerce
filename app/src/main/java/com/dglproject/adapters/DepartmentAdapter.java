package com.dglproject.adapters;

/**
 * Created by Tortuvshin Byambaa on 3/5/2017.
 */

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.dglproject.DglConstants;
import com.dglproject.R;
import com.dglproject.activity.ActivityCategory;
import com.dglproject.activity.ActivityDepartment;
import com.dglproject.utils.ImageLoader;

/**
 * Created by Tortuvshin Byambaa on 3/3/2017.
 */
public class DepartmentAdapter extends BaseAdapter {

    private Activity activity;
    public ImageLoader imageLoader;

    public DepartmentAdapter(Activity act) {
        this.activity = act;
        imageLoader = new ImageLoader(act);
    }

    public int getCount() {
        return ActivityDepartment.Department_ID.size();
    }

    public Object getItem(int position) {
        return position;
    }

    public long getItemId(int position) {
        return position;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;

        if(convertView == null){
            LayoutInflater inflater = (LayoutInflater) activity
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.category_item, null);
            holder = new ViewHolder();

            convertView.setTag(holder);
        }else{
            holder = (ViewHolder) convertView.getTag();
        }


        holder.txtText = (TextView) convertView.findViewById(R.id.txtText);
        holder.imgThumb = (ImageView) convertView.findViewById(R.id.imgThumb);

        holder.txtText.setText(ActivityCategory.Category_name.get(position));
        imageLoader.DisplayImage(DglConstants.AdminPageURL+ ActivityDepartment.Department_image.get(position), holder.imgThumb);

        return convertView;
    }

    static class ViewHolder {
        TextView txtText;
        ImageView imgThumb;
    }

}
