package cloud.techstar.ecommerce.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.techstar.ecommerce.R;

import org.json.JSONArray;
import org.json.JSONException;

import cloud.techstar.ecommerce.activity.ActivityCompanyProduct;
import cloud.techstar.ecommerce.utilities.TSConstants;
import cloud.techstar.imageloader.ImageLoader;

/**
 * Author: Tortuvshin Byambaa.
 * Project: TechstarShop
 * URL: https://www.github.com/tortuvshin
 */
public class CompanyAdapter extends BaseAdapter {

    final Context context;
    final JSONArray brands;
    public ImageLoader imageLoader;

    private LayoutInflater inflater = null;

    public CompanyAdapter(Context context, JSONArray brands) {
        this.context = context;
        this.brands = brands;
        imageLoader = new ImageLoader(context);
        inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    public int getCount() {
        return brands.length();
    }

    public Object getItem(int position) {
        try {
            return brands.getJSONObject(position);
        } catch (JSONException ex) {
            ex.printStackTrace();
        }
        return position;
    }

    public long getItemId(int position) {
        return position;
    }

    public View getView(int position, View convertView, ViewGroup parent) {

        View vi = convertView;
        if (vi == null)
            vi = inflater.inflate(R.layout.category_item, null);

        TextView txtText = (TextView) vi.findViewById(R.id.catText);
        ImageView imgThumb = (ImageView) vi.findViewById(R.id.catImg);

        try {
            String id = brands.getJSONObject(position).getString("id");
            String name = brands.getJSONObject(position).getString("name");
            txtText.setText(name);
            imageLoader.DisplayImage(TSConstants.WebURL + "/uploads/product_brand_icons/" +
                    brands.getJSONObject(position).getString("folder") + "/" +
                    brands.getJSONObject(position).getString("icon_image"), imgThumb);

            vi.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent brands = new Intent(context, ActivityCompanyProduct.class);
                    brands.putExtra("brand_id", id);
                    brands.putExtra("brand_name", name);
                    context.startActivity(brands);
                }
            });

        } catch (JSONException ex) {
            ex.printStackTrace();
        }

        return vi;
    }
}